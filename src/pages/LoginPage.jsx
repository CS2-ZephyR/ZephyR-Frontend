import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Cookies from '../utils/Cookies.js';

export default function LoginPage() {
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get('openid.mode') !== 'id_res') {
      const baseUrl = 'https://steamcommunity.com/openid/login';

      const queryParams = new URLSearchParams();
      queryParams.set('openid.ns', 'http://specs.openid.net/auth/2.0');
      queryParams.set(
        'openid.claimed_id',
        'http://specs.openid.net/auth/2.0/identifier_select',
      );
      queryParams.set(
        'openid.identity',
        'http://specs.openid.net/auth/2.0/identifier_select',
      );
      queryParams.set('openid.return_to', window.location.origin + '/login');
      queryParams.set('openid.realm', window.location.origin);
      queryParams.set('openid.mode', 'checkid_setup');

      window.location.href = baseUrl + '?' + queryParams;
    } else {
      const steamId = params.get('openid.identity').substring(37);

      Cookies.setCookie('steamId', btoa(steamId), {maxAge: 31536000});

      window.location.href = '/';
    }
  }, []);

  return <></>;
}
