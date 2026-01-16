import type { ApiResponse } from '@repo/types'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('health')
  getHealth(): ApiResponse<{ status: string }> {
    return {
      success: true,
      data: { status: 'ok' },
      message: 'API is running',
    }
  }
}
