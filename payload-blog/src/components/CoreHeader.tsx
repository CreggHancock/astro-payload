import { headers as getHeaders } from 'next/headers';
import config from '@/payload.config';
import React from 'react';
import { getPayload } from 'payload';

export const CoreHeader: React.FC = async () => { 

    const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const { user } = await payload.auth({ headers })
    return (<div className="header">{user?.email}</div>)
  };


export default CoreHeader;