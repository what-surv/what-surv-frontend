import CommingSoon from './misc/CommingSoon';
import { Appbar } from '../stories/appbar/Appbar';
import { Tabbar } from '../stories/tabbar/Tabbar';

const Lite = () => {
  return (
    <div>
      <Appbar isAccount isLogo isFullLogo />
      <Tabbar isMobileVisible size='default' />
      <div className='max-w-[770px] w-full min-h-[calc(100vh_-_562px)] m-auto mb-[100px]'>
        <CommingSoon />
      </div>
    </div>
  );
};

export default Lite;
