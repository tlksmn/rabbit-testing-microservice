import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { tap } from 'rxjs';
import { MicroservicesTopic } from './enums/enums';

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
    for (let i = 99; i < 109; i++) {
      this.getNewsById(i + 2);
    }
  }

  createNews(news: {
    publishType: string;
    title: string;
    body: string;
    status: string;
    photo?: string;
  }) {
    return this.client
      .send(MicroservicesTopic.formNews, news)
      .pipe(tap((e) => console.log(e, 'ewe')))
      .subscribe({ error: console.log, complete: console.log });
  }

  createNotification(notifications: {
    isAll: boolean;
    usersId: number[];
    message: string;
  }) {
    return this.client
      .send(MicroservicesTopic.notificationCreate, notifications)
      .pipe(tap((e) => console.log(e, 'ewe')))
      .subscribe({ error: console.log, complete: console.log });
  }

  updateNews(news: FormNewsParamsI) {
    return this.client
      .send(MicroservicesTopic.formNews, news)
      .pipe(tap((e) => console.log(e)))
      .subscribe({ error: console.log, complete: console.log });
  }

  getNews(params: GetNewsParamsI) {
    return this.client
      .send(MicroservicesTopic.getNews, params)
      .pipe(tap((e) => console.log(e)))
      .subscribe({ error: console.log, complete: console.log });
  }

  getNewsById(id) {
    return this.client
      .send(MicroservicesTopic.getOneByIdNews, { id })
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
