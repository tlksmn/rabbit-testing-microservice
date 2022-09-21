export enum MicroservicesTopic {
  notificationCreate = 'notification-new',
  notificationGet = 'notification-get',
  notificationUpdate = 'notification-update',

  getOneByIdNews = 'notification_get-one-by-id-news',
  formNews = 'notification_form-news',
  deleteNews = 'notification_delete-news',
  getNews = 'notification_get-news',
}

export enum SystemLogTopics {
  formSystemLogs = 'log_form-system-logs',
  getSystemLogs = 'log_get-system-logs',
}

export enum ProductAnalyticsTopics {
  fromProductsAnalytics = 'log_form-products-analytics',
  getProductsAnalytics = 'log_get-products-analytics',
  getProductWidget = 'log_get-product-widget',
  getProductsTrend = 'log_get-products-trend',
}
