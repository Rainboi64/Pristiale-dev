import { useNavigate, useRouteError } from 'react-router-dom';
import pristiale from './assets/images/pristiale.svg';
import { Button } from './components/ui/button';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col text-balance text-center">
      <div className="helvetica flex flex-1 flex-col items-center justify-center gap-4 text-lg">
        <img src={pristiale} width={500} className="p-12" />
        <p>
          An error occured, you can check the developer console for more
          information.
        </p>
        <Button onClick={() => navigate('/')}>Navigate to home</Button>
      </div>
      <p className="p-2 text-sm text-muted-foreground">
        {/* @ts-expect-error */}
        {error.message || JSON.stringify(error)}
      </p>
    </div>
  );
}
