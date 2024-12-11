import React, { useState } from "react";

const LinkSSOSection: React.FC = () => {
  const [linkedSSOs, setLinkedSSOs] = useState<string[]>([]);

  const handleLinkSSO = async (ssoProvider: string) => {
    try {
      const response = await fetch(`/api/link-sso?provider=${ssoProvider}`, {
        method: "POST",
      });

      if (response.ok) {
        setLinkedSSOs((prev) => [...prev, ssoProvider]);
        alert(`${ssoProvider} linked successfully!`);
      } else {
        alert(`Failed to link ${ssoProvider}.`);
      }
    } catch (error) {
      console.error(`Error linking ${ssoProvider}:`, error);
    }
  };

  const handleUnlinkSSO = async (ssoProvider: string) => {
    try {
      const response = await fetch(`/api/unlink-sso?provider=${ssoProvider}`, {
        method: "POST",
      });

      if (response.ok) {
        setLinkedSSOs((prev) => prev.filter((provider) => provider !== ssoProvider));
        alert(`${ssoProvider} unlinked successfully!`);
      } else {
        alert(`Failed to unlink ${ssoProvider}.`);
      }
    } catch (error) {
      console.error(`Error unlinking ${ssoProvider}:`, error);
    }
  };

  return (
    <div>
      <h3>SSO Services</h3>
      {linkedSSOs.length > 0 ? (
        linkedSSOs.map((provider) => (
          <div key={provider}>
            {provider} <button onClick={() => handleUnlinkSSO(provider)}>Unlink</button>
          </div>
        ))
      ) : (
        <p>No linked SSO services.</p>
      )}
      <button onClick={() => handleLinkSSO("Google")}>Link Google</button>
      <button onClick={() => handleLinkSSO("GitHub")}>Link GitHub</button>
    </div>
  );
};

export default LinkSSOSection;
