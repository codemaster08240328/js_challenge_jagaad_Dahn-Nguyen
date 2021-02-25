import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosError } from 'axios';
import { LANG, CUR_TYPE, API_VERSION } from '~/utils/constant';

type TPluginParams = {
  $axios: NuxtAxiosInstance
  redirect: (key: string) => void
};

export default function ({ $axios, redirect }: TPluginParams) {
  $axios.setHeader('Accept-Language', LANG);
  $axios.setHeader('Content-Type', 'application/json');
  $axios.setHeader('x-musement-currency', CUR_TYPE);
  $axios.setHeader('x-musement-version', API_VERSION);

  $axios.onError((error: AxiosError) => {
    console.log( 'error===>', error);
    redirect('/sorry');
  });
}
