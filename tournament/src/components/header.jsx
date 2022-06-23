import doWeHaveToken from "./checkIfAutorized";

export default function Header() {
  if (doWeHaveToken()) {
    return (
      <div className="autorizationNavElemes">
        <a className="Logo" href="/">
          <img
            src="https://thumb.tildacdn.com/tild3864-6334-4461-b934-313861376333/-/resize/200x/-/format/webp/image.png"
            alt="SingLogo"
          />
        </a>
        <div className="headerUserNav">
          <a href="/profile" className="double-border-button">
            Profile
          </a>

          <a
            href="/"
            className="double-border-button-blue "
            onClick={() => {
              sessionStorage.clear();
            }}
          >
            Log out
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="autorizationNavElemes">
      <a className="Logo" href="/">
        <img
          src="https://thumb.tildacdn.com/tild3864-6334-4461-b934-313861376333/-/resize/200x/-/format/webp/image.png"
          alt="SingLogo"
        />
      </a>
      <div className="headerUserNav">
        <a className="double-border-button" href="/login">
          Login
        </a>
        <a href="/registration" className="double-border-button-blue ">
          Sign up
        </a>
      </div>
    </div>
  );
}
