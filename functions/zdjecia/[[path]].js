import { proxy } from '../_proxy.js';
export const onRequest = (context) => proxy(context);
