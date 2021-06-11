import React from 'react';
import styled from 'styled-components';
import { Row, Col, GridSection } from '../styledComponents/Grid.styled';

const GridContainer = ({

  children,
}) => (
  <>
    <Row>

      <Col lg={12} md={12} sm={12}>
        <GridSection>
          <div style={{ marginTop: '60px' }} />
          {children}
        </GridSection>
      </Col>

    </Row>
  </>
);

export default GridContainer;
