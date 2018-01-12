declare module 'http-headers' {

  export interface HttpVersion {
    major: number;
    minor: number;
  }

  interface BareHttpHeaders {
    [name: string]: string;
  }

  export interface RequestHttpHeaders {
    method: string;
    url: string;
    version: HttpVersion;
    headers: BareHttpHeaders;
  }

  export interface ResponseHttpHeaders {
    version: HttpVersion;
    statusCode: number;
    statusMessage: string;
    headers: BareHttpHeaders;
  }

  function parse(data: string, onlyHeaders?: boolean): BareHttpHeaders | RequestHttpHeaders | ResponseHttpHeaders;

  export default parse;
}
