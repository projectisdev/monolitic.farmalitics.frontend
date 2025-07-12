import { Fragment, useState } from 'react';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/applayout/toolbar';
import { AppLayoutLightSidebarContent } from '.';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { KeenIcon } from '@/components/keenicons';

const AppLayoutLightSidebarPage = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20)
  });

  return (
    <Fragment>
      <Container>
        <div className="flex flex-col justify-center items-center min-h-[120px] text-center">
            <h1 className="m-0 text-4xl font-bold text-success">Inicio</h1>
          <p className="mt-2">Bienvenido/a, ¿Qué deseas realizar?</p>
        </div>
      </Container>

      <Container>
        <AppLayoutLightSidebarContent />
      </Container>
    </Fragment>
  );
};

export { AppLayoutLightSidebarPage };
