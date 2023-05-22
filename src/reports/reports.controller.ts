import { Controller, Post, Body, UseGuards, Patch, Query, Param, Get } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from 'src/entities/user.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { ReportDto } from './dtos/report.dto';
import { customInterceptor } from 'src/serializers/users.serializer';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { query } from 'express';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @customInterceptor(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateApproval(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.approval(parseInt(id) ,body);
  }
}