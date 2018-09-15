import Adapter from 'enzyme-adapter-react-16';
import m from 'module';
import { configure } from 'enzyme';

const originalLoader = m._load;

configure({ adapter: new Adapter() });
m._load = function (request, parent, isMain) {
  if (request.match(/.jpeg|.jpg|.png$/)) return { uri: request };
  return originalLoader(request, parent, isMain);
};
