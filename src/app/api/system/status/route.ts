import { NextResponse } from 'next/server';
import { executeQuery, testConnection } from '@/lib/database';

interface SystemCheck {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  responseTime?: number;
  details?: string;
  error?: string;
}

interface SystemStatus {
  overall: 'operational' | 'degraded' | 'down';
  checks: SystemCheck[];
  timestamp: string;
}

// Check database connectivity and performance
async function checkDatabase(): Promise<SystemCheck> {
  const startTime = Date.now();
  
  try {
    // Test basic connection
    const isConnected = await testConnection();
    if (!isConnected) {
      return {
        name: 'Database',
        status: 'down',
        error: 'Cannot establish connection to database'
      };
    }

    // Test query performance
    await executeQuery('SELECT 1 as health_check');
    const responseTime = Date.now() - startTime;

    // Determine status based on response time
    const status = responseTime < 1000 ? 'operational' : responseTime < 3000 ? 'degraded' : 'down';

    return {
      name: 'Database',
      status,
      responseTime,
      details: `Connection successful, query executed in ${responseTime}ms`
    };
  } catch (error) {
    return {
      name: 'Database',
      status: 'down',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown database error'
    };
  }
}

// Check file storage (Cloudinary) status
async function checkFileStorage(): Promise<SystemCheck> {
  const startTime = Date.now();
  
  try {
    // Check if Cloudinary credentials are configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return {
        name: 'File Storage',
        status: 'degraded',
        details: 'Cloudinary credentials not fully configured'
      };
    }

    // Test Cloudinary API availability (ping endpoint)
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/ping`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    const responseTime = Date.now() - startTime;

    if (response.ok) {
      const status = responseTime < 2000 ? 'operational' : 'degraded';
      return {
        name: 'File Storage',
        status,
        responseTime,
        details: `Cloudinary API responding in ${responseTime}ms`
      };
    } else {
      return {
        name: 'File Storage',
        status: 'degraded',
        responseTime,
        error: `Cloudinary API returned status ${response.status}`
      };
    }
  } catch (error) {
    return {
      name: 'File Storage',
      status: 'down',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'File storage check failed'
    };
  }
}

// Check API endpoints health
async function checkAPIs(): Promise<SystemCheck> {
  const startTime = Date.now();
  
  try {
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    
    // Test core API endpoints
    const endpoints = ['/api/news', '/api/documents', '/api/events'];
    const promises = endpoints.map(endpoint => 
      fetch(`${baseUrl}${endpoint}`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(3000)
      }).then(res => ({ endpoint, ok: res.ok, status: res.status }))
      .catch(err => ({ endpoint, ok: false, error: err.message }))
    );

    const results = await Promise.all(promises);
    const responseTime = Date.now() - startTime;
    
    const failedEndpoints = results.filter(r => !r.ok);
    
    if (failedEndpoints.length === 0) {
      return {
        name: 'API Services',
        status: 'operational',
        responseTime,
        details: `All ${endpoints.length} core APIs responding`
      };
    } else if (failedEndpoints.length < endpoints.length) {
      return {
        name: 'API Services',
        status: 'degraded',
        responseTime,
        details: `${endpoints.length - failedEndpoints.length}/${endpoints.length} APIs operational`
      };
    } else {
      return {
        name: 'API Services',
        status: 'down',
        responseTime,
        error: 'All core APIs are unresponsive'
      };
    }
  } catch (error) {
    return {
      name: 'API Services',
      status: 'down',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'API health check failed'
    };
  }
}

// Check system memory usage
async function checkSystemResources(): Promise<SystemCheck> {
  try {
    // Get memory usage if available (Node.js environment)
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memoryUsage = process.memoryUsage();
      const usedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
      const totalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
      const usagePercent = Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100);

      // Determine status based on memory usage
      let status: 'operational' | 'degraded' | 'down';
      if (usagePercent < 70) {
        status = 'operational';
      } else if (usagePercent < 90) {
        status = 'degraded';
      } else {
        status = 'down';
      }

      return {
        name: 'System Resources',
        status,
        details: `Memory: ${usedMB}MB/${totalMB}MB (${usagePercent}%)`
      };
    } else {
      // Fallback for environments where process.memoryUsage is not available
      return {
        name: 'System Resources',
        status: 'operational',
        details: 'Resource monitoring not available in this environment'
      };
    }
  } catch (error) {
    return {
      name: 'System Resources',
      status: 'degraded',
      error: error instanceof Error ? error.message : 'Resource check failed'
    };
  }
}

// Determine overall system status
function calculateOverallStatus(checks: SystemCheck[]): 'operational' | 'degraded' | 'down' {
  const downCount = checks.filter(c => c.status === 'down').length;
  const degradedCount = checks.filter(c => c.status === 'degraded').length;

  if (downCount > 0) {
    return downCount >= checks.length / 2 ? 'down' : 'degraded';
  }
  
  if (degradedCount > 0) {
    return 'degraded';
  }
  
  return 'operational';
}

// GET /api/system/status - Get system health status
export async function GET() {
  try {
    console.log('Running system health checks...');
    
    // Run all health checks in parallel
    const [databaseCheck, storageCheck, apiCheck, resourceCheck] = await Promise.all([
      checkDatabase(),
      checkFileStorage(), 
      checkAPIs(),
      checkSystemResources()
    ]);

    const checks = [databaseCheck, storageCheck, apiCheck, resourceCheck];
    const overall = calculateOverallStatus(checks);

    const systemStatus: SystemStatus = {
      overall,
      checks,
      timestamp: new Date().toISOString()
    };

    console.log('System health check completed:', {
      overall,
      checkCount: checks.length,
      operational: checks.filter(c => c.status === 'operational').length,
      degraded: checks.filter(c => c.status === 'degraded').length,
      down: checks.filter(c => c.status === 'down').length
    });

    return NextResponse.json({
      success: true,
      status: systemStatus
    });

  } catch (error) {
    console.error('System status check error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to perform system health checks',
      status: {
        overall: 'down',
        checks: [{
          name: 'System Check',
          status: 'down' as const,
          error: 'Health check system failure'
        }],
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}
