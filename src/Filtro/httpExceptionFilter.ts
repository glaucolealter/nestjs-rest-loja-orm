import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Response, Request } from 'express'; // Importando Request

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>(); // Obtendo o request

        let status = 500;
        let message = 'Erro interno do servidor';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseData = exception.getResponse();

            if (typeof responseData === 'object' && responseData !== null) {
                message = (responseData as any).message || JSON.stringify(responseData);
            } else {
                message = responseData as string;
            }
        } else {
            exception = new InternalServerErrorException();
        }

       
        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url, // Caminho da requisição
            method: request.method, // Método HTTP da requisição
        });
    }
}
