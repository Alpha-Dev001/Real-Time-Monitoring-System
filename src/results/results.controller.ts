import {
    Controller,
    Get,
    Query,
    UseGuards,
    Param,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { GetUser, Roles } from '../auth/decorators';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { ResultsService } from './results.service';
import { GetResultsDto, ResultAnalyticsDto } from './dto';
import { ResultAccessGuard, ResultOwnerGuard } from './guards';

@Controller('results')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResultsController {
    constructor(private resultsService: ResultsService) { }

    // ── Teacher routes ─────────────────────────────────────────────────────

    // GET /api/results/session/:sessionId
    @Get('session/:sessionId')
    @Roles(Role.TEACHER)
    @UseGuards(ResultOwnerGuard)
    getSessionResults(
        @Param('sessionId') sessionId: string,
        @GetUser('id') teacherId: string,
        @Query() dto: GetResultsDto,
    ) {
        return this.resultsService.getSessionResults(sessionId, teacherId, dto);
    }

    // GET /api/results/analytics/exam/:examId
    @Get('analytics/exam/:examId')
    @Roles(Role.TEACHER)
    getExamAnalytics(
        @Param('examId') examId: string,
        @GetUser('id') teacherId: string,
        @Query() dto: ResultAnalyticsDto,
    ) {
        return this.resultsService.getExamAnalytics(examId, teacherId, dto);
    }

    // ── Student routes ─────────────────────────────────────────────────────

    // GET /api/results/session/:sessionId/my-results
    @Get('session/:sessionId/my-results')
    @Roles(Role.STUDENT)
    @UseGuards(ResultAccessGuard)
    getMyResults(
        @Param('sessionId') sessionId: string,
        @GetUser('id') studentId: string,
    ) {
        return this.resultsService.getMyResults(sessionId, studentId);
    }
}
