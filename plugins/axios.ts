import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosError } from 'axios';
import { LANG, CUR_TYPE, API_VERSION } from '~/utils/constant';

type TPluginParams = {
  $axios: NuxtAxiosInstance
  redirect: (key: string) => void
};

export default function ({ $axios, redirect }: TPluginParams) {
  $axios.onRequest(config => {
    config.headers = {
      'Accept-Language': LANG,
      'Content-Type': 'application/json',
      'x-musement-currency': CUR_TYPE,
      'x-musement-version': API_VERSION
    }
  });

  $axios.onError((error: AxiosError) => {
    console.log( 'error===>', error);
    redirect('/sorry');
  });
}
