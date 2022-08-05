import Button from '../../../styles/elements/button';
import Form from '../../../styles/elements/form';
import Input from '../../../styles/elements/input';
import Wrapper from '../../../styles/elements/wrapper';

export default function Login() {
  return (
    <Wrapper>
      <Form>
        <Input placeholder="teste" />
        <Button>Login</Button>
      </Form>
    </Wrapper>
  );
}
