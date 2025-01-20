import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const bearerToken = localStorage.getItem('bearerToken')

  // Gets the bearer token from localStorage and sets the proper authorization header to every every performed by the application
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${bearerToken}`)
  })

  return next(authReq)
};