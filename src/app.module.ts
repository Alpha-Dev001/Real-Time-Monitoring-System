import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ClassesModule } from './classes/classes.module';
import { ExamsModule } from './exams/exams.module';
import { SessionsModule } from './sessions/sessions.module';
import { ResultsModule } from './results/results.module';
import { ProctoringGateway } from './proctoring/proctoring/proctoring.gateway';

@Module({
  imports: [PrismaModule, AuthModule, ClassesModule, ExamsModule, SessionsModule, ResultsModule,ConfigurableModuleBuilder.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService, ProctoringGateway],
})
export class AppModule {}
