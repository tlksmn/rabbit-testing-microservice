import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { tap } from 'rxjs';
import { MicroservicesTopic, SystemLogTopics } from './enums/enums';

interface GetNewsParamsI {
  search?: string;
  filter?: {
    status?: 'draft' | 'publish';
    publishType?: 'Markdown' | 'MarkdownV2' | 'HTML';
    range?: {
      from?: number;
      to?: number;
    };
  };
  pagination?: {
    currentPage?: number;
    perPage?: number;
  };
}
interface FormNewsParamsI {
  title: string;
  body: string;
  status: string;
  id: number;
  publishType: string;
  photo?: string;
}

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('NOTIFICATION_NEWS_SERVICES') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.client.connect();

    for (let i = 0; i < 2; i++) {
      this.formSystemLog();
    }
  }

  formSystemLog() {
    return this.client
      .send(SystemLogTopics.formSystemLogs, {})
      .pipe(tap((e) => console.log(e)))
      .subscribe({ error: console.log, complete: console.log });
  }

  /* Private methods */

  private makeid(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
