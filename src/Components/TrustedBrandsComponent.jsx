
import "../assets/TrustedBrandsComponents.css";


const trustedCompanies = [
  {
    name: "Google",
    logo:
      "https://firebasestorage.googleapis.com/v0/b/ihatereading-4ba52.appspot.com/o/public%2Fbrands%2FLogo.png-3.png?alt=media&token=ad19be3c-a464-4869-adb1-75b13df1522d",
  },
  {
    name: "Spotify",
    logo:
      "https://firebasestorage.googleapis.com/v0/b/ihatereading-4ba52.appspot.com/o/public%2Fbrands%2FLogo.png-5.png?alt=media&token=50fea414-9b0b-439c-9b55-cad0daaf6df3",
  },
  {
    name: "Tesla",
    logo:
      "https://firebasestorage.googleapis.com/v0/b/ihatereading-4ba52.appspot.com/o/public%2Fbrands%2FLogo.png-6.png?alt=media&token=01eca906-cc76-4a3d-8c23-88a85d61c256",
  },
  {
    name: "OpenAI",
    logo:
      "https://firebasestorage.googleapis.com/v0/b/ihatereading-4ba52.appspot.com/o/public%2Fbrands%2FLogo.png-7.png?alt=media&token=da7c6aaf-3efb-49d1-9fb9-2461ce831886",
  },
  {
    name: "Airbnb",
    logo:
      "https://firebasestorage.googleapis.com/v0/b/ihatereading-4ba52.appspot.com/o/public%2Fbrands%2FLogo.png-8.png?alt=media&token=a29d83cf-aa7b-450b-9217-a4ea5582876b",
  },
  {
    name: "Nvidia",
    logo:
      "https://firebasestorage.googleapis.com/v0/b/ihatereading-4ba52.appspot.com/o/public%2Fbrands%2FLogo.png.png?alt=media&token=e993d678-b9b9-4d85-a543-c991cf1d432f",
  },
  {
    name: "Apple",
    logo:
      "https://firebasestorage.googleapis.com/v0/b/ihatereading-4ba52.appspot.com/o/public%2Fbrands%2FLogo.png-4.png?alt=media&token=27594b44-f0ac-4d05-ac6b-2c15eabbf2b8",
  },
];

const TrustedBrandsComponent = () => {
  return (
    <div className="trusted-brands-container">
      <p className="trusted-brands-title">Trusted by some top brands</p>
      <div className="trusted-brands-logos">
        {trustedCompanies.map((company) => (
          <div className="brand-card" key={company.name}>
            <div className="brand-hover-info">
              <div className="brand-info-box">
                {/* Add MousePointer icon here if needed later */}
                <span className="brand-name">{company.name}</span>
              </div>
            </div>
            <img
              src={company.logo}
              alt={company.name}
              className="brand-logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedBrandsComponent;
