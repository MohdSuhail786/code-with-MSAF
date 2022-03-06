import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { adminLoginRoute, DEFAULT_IDE_ROUTE, DEFAULT_PRACTICE_ROUTE, organizationLoginRoute } from '../../../config';

export default function HomeFooter() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center align-items-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          {/* <a href='' className='me-4 text-reset'>
            <i className='fab fa-facebook-f'></i>
          </a> */}
          <a href='https://api.whatsapp.com/send/?phone=+917017XXXXXX' className='me-4 text-reset'>
          <i className='bx bxl-whatsapp' ></i>
          </a>
          <a href='https://mail.google.com/mail/?view=cm&fs=1&to=***@gmail.com' className='me-4 text-reset'>
          <i className='bx bxl-google' ></i>
          </a>
          {/* <a href='' className='me-4 text-reset'>
            <i className='fab fa-instagram'></i>
          </a> */}
          <a href='https://www.linkedin.com/in/decor-art-797814224/' className='me-4 text-reset'>
          <i className='bx bxl-linkedin' ></i>
          </a>
          {/* <a href='' className='me-4 text-reset'>
            <i className='fab fa-github'></i>
          </a> */}
        </div>
      </section>

      <section className=''>
        <div className='container text-center text-md-start mt-5'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <p className='text-uppercase fw-bold mb-4'>
              <i className="bx bxl-c-plus-plus"></i>CodingWorm
              </p>
              <p style={{textAlign:'justify'}}>
              CodingWorm promotes constant learning and friendly programming competitions for its users, along with the support of its large community of problem curators.
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Top Categories</h6>
              <p>
                <a href={DEFAULT_PRACTICE_ROUTE} className='text-reset'>
                  Practice
                </a>
              </p>
              <p>
                <a href={DEFAULT_IDE_ROUTE} className='text-reset'>
                  IDE
                </a>
              </p>
              <p>
                <a href={organizationLoginRoute} className='text-reset'>
                  Institutions
                </a>
              </p>
              <p>
                <a href={adminLoginRoute} className='text-reset'>
                  Admin
                </a>
              </p>
            </div>

            {/* <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>&nbsp;</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Aluminium Products
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Wire Mesh Products
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Hexagon Glass Mirror
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Silver Products
                </a>
              </p>
            </div> */}

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                Harthala, Moradabad, UP
              </p>
              <p>
                ***@gmail.com
              </p>
              <p>
                +91 7017X XXXXX
              </p>
              <p>
                +91 9058X XXXXX
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright:
        <a className='text-reset fw-bold' href=''>
          codingworm.com
        </a>
      </div>
    </MDBFooter>
  );
}