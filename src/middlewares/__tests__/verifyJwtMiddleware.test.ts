import middy from '@middy/core';
import { Context } from 'aws-lambda';
import verifyJwtMiddleware from '../verifyJwtMiddleware';
import { LesgoException } from '../../exceptions';
import { verify } from '../../utils/jwt';

jest.mock('../../utils/jwt');
jest.mock('../../utils/logger');

describe('verifyJwtMiddleware', () => {
  const mockRequest: middy.Request = {
    event: {
      headers: {
        authorization: 'mock-token',
      },
    },
    context: {
      awsRequestId: '123',
    } as Context,
    response: {},
    error: null,
    internal: {},
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should verify the JWT and set the decoded token in the request event', () => {
    const mockDecodedToken = { id: '123', username: 'john.doe' };
    (verify as jest.Mock).mockReturnValue(mockDecodedToken);

    verifyJwtMiddleware().before(mockRequest);

    expect(verify).toHaveBeenCalledWith('mock-token', undefined, undefined);
    expect(mockRequest.event.jwt).toEqual(mockDecodedToken);
  });

  it('should throw a LesgoException if there is no token provided', () => {
    mockRequest.event.headers.authorization = undefined;

    expect(() => verifyJwtMiddleware().before(mockRequest)).toThrow(
      new LesgoException(
        'No token provided',
        'lesgo.middlewares.verifyJwtMiddleware::NO_TOKEN_PROVIDED',
        401
      )
    );
  });

  it('should throw a LesgoException if there is an error verifying the JWT', () => {
    mockRequest.event.headers.authorization = 'mock-token';
    const mockError = new Error('Mock error');
    (verify as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    expect(() => verifyJwtMiddleware().before(mockRequest)).toThrow(
      new LesgoException(
        'Error verifying JWT',
        'lesgo.middlewares.verifyJwtMiddleware::ERROR_VERIFYING_JWT',
        401,
        mockError
      )
    );
  });
});
