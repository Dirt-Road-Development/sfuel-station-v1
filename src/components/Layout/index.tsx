import * as Component from './styles';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  return (
    <Component.Container>
      {props.children}
    </Component.Container>
  );
}

export default Layout;
