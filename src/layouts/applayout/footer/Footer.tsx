import { Container } from '@/components/container';
import { generalSettings } from '@/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-3 py-5">
          <div className="flex order-2 md:order-1 justify-end gap-2 font-normal text-2sm">
            <span className="text-gray-500">{currentYear} &copy;</span>
            <a
              className="text-gray-600 hover:text-primary"
            >
              Intec Inc.
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
