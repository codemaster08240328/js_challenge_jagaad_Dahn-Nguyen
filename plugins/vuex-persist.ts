import VuexPersistence from 'vuex-persist';
import { Store } from 'vuex';

export default ({ store }: {store: Store<any>}) => {
  new VuexPersistence({}).plugin(store);
}
