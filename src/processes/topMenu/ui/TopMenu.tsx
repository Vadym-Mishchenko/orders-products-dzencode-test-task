import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FiClock } from 'react-icons/fi';
import { FaUserShield, FaUsers } from 'react-icons/fa';
import { useAppSelector, useSocketSession } from '@/shared';

export const TopMenu = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { count: sessionsCount } = useAppSelector((state) => state.session);
  useSocketSession();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const formatDate = (date: Date) => {
    const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(date);
    const day = date.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(date);
    const year = date.getFullYear();

    return `${capitalize(weekday)} ${day} ${capitalize(month)}, ${year}`;
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="py-3 px-4 bg-white border-bottom shadow-sm">
      <Container fluid className="px-3">
        <Row className="align-items-center">
          <Col xs="auto" className="d-flex align-items-center me-4 gap-2">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <FaUserShield color="green" size={32} />
              <span className="fw-semibold fs-6 text-success ms-2 user-select-none">INVENTORY</span>
            </Link>
          </Col>

          {/* <Col xs={4}>
            <Form.Control
              type="text"
              name="search"
              placeholder="Поиск"
              aria-label="Search"
              autoComplete="off"
              className="bg-light"
              style={{
                borderColor: '#ccc',
                maxWidth: 400,
              }}
            />
          </Col> */}

          <Col
            className="text-end d-flex justify-content-end align-items-center"
            style={{ gap: '0.5rem' }}
          >
            <time>{formatDate(currentTime)}</time>
            <FiClock color="green" size={18} />
            <time>{formatTime(currentTime)}</time>
            <span className="ms-4 text-success d-flex align-items-center gap-1 user-select-none">
              <FaUsers />
              <strong>{sessionsCount}</strong>
            </span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
