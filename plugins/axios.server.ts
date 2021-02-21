import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosError } from 'axios'

type TPluginParams = {
  $axios: NuxtAxiosInstance
  redirect: (key: string) => void
}

export default function ({ $axios, redirect }: TPluginParams) {
  $axios.onError((error: AxiosError) => {
    console.log( 'error===>', error);
    redirect('/sorry');
  })
}
