import React, { useState } from 'react';
import {
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import { styled } from 'styled-components';

export default function JaBehaviorial() {
  const [basicActive, setBasicActive] = useState('home');

  const handleBasicClick = (value) => {
    if (value === basicActive) return;
    setBasicActive(value);
  }

  return (
    <Wrapper className="section">
    <MDBRow>
      <MDBCol size={4}>
        <MDBListGroup light small>
          <MDBTabs>
            <MDBListGroupItem action active={basicActive === 'feature1'} noBorders className='px-3 '>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('feature1')}>Feature 1</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem>
            <MDBListGroupItem action active={basicActive === 'feature2'} noBorders className='px-3'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('feature2')}>Feature 2</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem>
            <MDBListGroupItem action active={basicActive === 'feature3'} noBorders className='px-3'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('feature3')}>Feature 3</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem>
            <MDBListGroupItem action active={basicActive === 'feature4'} noBorders className='px-3'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('feature4')}>Feature 4</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem>
          </MDBTabs>
        </MDBListGroup>
      </MDBCol>

      <MDBCol size={8}>
        <MDBTabsContent>
          <MDBTabsPane show={basicActive === 'feature1'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quibusdam exercitationem
            eligendi voluptate doloribus non pariatur libero quod nobis mollitia odio dolore eos debitis iure,
            autem quisquam ullam beatae.
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'feature2'}>
            Ea eos asperiores deserunt reprehenderit voluptatem deleniti dolor iure eum consectetur commodi.
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'feature3'}>
            Et perspiciatis facilis labore natus at necessitatibus. Sequi earum qui illum reiciendis? Excepturi,
            dicta consequuntur, voluptas aspernatur, quis laboriosam exercitationem quasi officia tempore iste
            assumenda aliquam.
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'feature4'}>
            Praesentium asperiores nemo ratione quas atque excepturi odio aliquid libero, architecto aspernatur
            expedita, corrupti, rem odit quos exercitationem maxime at. Ex, eveniet rerum laborum accusamus
            delectus magnam maxime!
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBCol>
    </MDBRow>
    </Wrapper>
  );
}
const Wrapper = styled.section`
width:60%;
margin:10% auto;

`