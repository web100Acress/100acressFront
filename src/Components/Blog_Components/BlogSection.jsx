/** @format */

import React from "react";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Wrapper = styled.section`
  padding: 60px 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border: none;
    margin-bottom: 30px;
    break-inside: avoid;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      transform: translateY(-5px);
    }

    .card-img-top {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-body {
      padding: 20px;

      .card-title {
        font-size: 1.25rem;
        margin-bottom: 15px;
        color: #333;
        line-height: 1.4;
      }

      .card-text {
        color: #666;
        margin-bottom: 15px;
        line-height: 1.6;

        small {
          color: #888;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 15px;

          i {
            display: inline-flex;
            align-items: center;
            gap: 5px;
          }
        }
      }
    }
  }

  .card-columns {
    column-count: 3;
    column-gap: 30px;

    @media (max-width: 992px) {
      column-count: 2;
    }

    @media (max-width: 768px) {
      column-count: 1;
    }
  }
`;

function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet.",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad alias, aliquid amet aspernatur atque",
      image:
        "https://images.unsplash.com/photo-1535025639604-9a804c092faa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6cb0ceb620f241feb2f859e273634393&auto=format&fit=crop&w=500&q=80",
      views: 1000,
      author: "admin",
      date: "Jan 20, 2018",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur.",
      excerpt:
        "Amet commodi deleniti enim laboriosam odio placeat praesentium quis ratione rerum suscipit.",
      image:
        "https://images.unsplash.com/photo-1472076638602-b1f8b1ac0b4a?ixlib=rb-0.3.5&s=63c9de7246b535be56c8eaff9b87dd89&auto=format&fit=crop&w=500&q=80",
      views: 850,
      author: "admin",
      date: "Jan 18, 2018",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur.",
      excerpt:
        "This is a longer card with supporting text below as a natural lead-in to additional content.",
      image:
        "https://images.unsplash.com/photo-1535086181678-5a5c4d23aa7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=34c86263bec2c8f74ceb74e9f4c5a5fc&auto=format&fit=crop&w=500&q=80",
      views: 1200,
      author: "admin",
      date: "Jan 15, 2018",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet, consectetur.",
      excerpt:
        "This is a longer card with supporting text below as a natural lead-in to additional content.",
      image:
        "https://images.unsplash.com/photo-1535074153497-b08c5aa9c236?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2aaf944a59f16fe1fe72f5057b3a7dd&auto=format&fit=crop&w=500&q=80",
      views: 1200,
      author: "admin",
      date: "Jan 15, 2018",
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit amet.",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, consequatur culpa cumque deserunt dignissimos error explicabo fugiat harum ipsam magni minus mollitia nemo perferendis qui repellendus rerum saepe vel voluptate voluptatem voluptatum! Aperiam, labore, molestiae!.",
      image:
        "https://images.unsplash.com/photo-1535124406821-d2848dfbb25c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98c434d75b44c9c23fc9df2a9a77d59f&auto=format&fit=crop&w=500&q=80",
      views: 1000,
      author: "admin",
      date: "Jan 20, 2018",
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi debitis eaque explicabo fuga maiores necessitatibus, neque omnis optio vel!",
      image:
        "https://images.unsplash.com/photo-1508015926936-4eddcc6d4866?ixlib=rb-0.3.5&s=10b3a8717ab609be8d7786cab50c4e0b&auto=format&fit=crop&w=500&q=80",
      views: 1000,
      author: "admin",
      date: "Jan 20, 2018",
    },
  ];

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="card-columns">
          {blogPosts.map((post) => (
            <div key={post.id} className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src={post.image}
                  alt={post.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.excerpt}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      <span>
                        <i className="fas fa-eye"></i> {post.views}
                      </span>
                      <span>
                        <i className="far fa-user"></i> {post.author}
                      </span>
                      <span>
                        <i className="fas fa-calendar-alt"></i> {post.date}
                      </span>
                    </small>
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default BlogSection;