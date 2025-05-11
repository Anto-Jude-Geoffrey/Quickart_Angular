import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localToken=localStorage.getItem('token');
  req=req.clone({headers: req.headers.set('Authorization','bearer '+localToken)});
  return next(req);
};
