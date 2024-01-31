import React from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function Resources() {
    return (
      <div>
        <div>
        </div>
        <div>
          <html lang="en">
            <head>
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <link rel="stylesheet" href="styles.css" />
              <title>Cheer Connections Resources</title>
            </head>
            <body>
              <header>
                <h1>Cheer Connections Resources</h1>
              </header>
              <main>
                <section className="organization">
                  <h2>Ontario Caregivers Association</h2>
                  <p>
                    Website:{' '}
                    <a href="https://ontariocaregivers.ca/">
                      Ontario Caregivers Association
                    </a>
                  </p>
                  <p>
                    Contact:{' '}
                    <a href="https://ontariocaregivers.ca/contact/">
                      Contact Information
                    </a>
                  </p>
                </section>
              </main>
              <footer>
                <p>&copy; 2024 Cheer Connections</p>
              </footer>
            </body>
          </html>
        </div>
      </div>
    );
  }
  

export default Resources