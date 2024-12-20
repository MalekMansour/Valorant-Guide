import React, { useEffect, useState } from "react";

type Weapon = {
  uuid: string;
  displayName: string;
  category: string;
  shopData: {
    cost: number;
  } | null;
  fireRate: number | null;
  magazineSize: number | null;
  reloadTimeSeconds: number | null;
  weaponStats: {
    fireRate: number;
    magazineSize: number;
    reloadTimeSeconds: number;
  } | null;
  displayIcon: string;
};

const GunPage: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  // Fetch weapons from the Valorant API
  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const response = await fetch("https://valorant-api.com/v1/weapons");
        const data = await response.json();
        setWeapons(data.data || []);
      } catch (error) {
        console.error("Error fetching weapons:", error);
      }
    };

    fetchWeapons();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Valorant Weapons</h1>
      <div style={styles.weaponGrid}>
        {weapons.map((weapon) => (
          <div
            key={weapon.uuid}
            onClick={() => setSelectedWeapon(weapon)}
            style={{
              ...styles.weaponCard,
              border: selectedWeapon?.uuid === weapon.uuid ? "2px solid #ff4655" : "1px solid #333",
            }}
          >
            <img src={weapon.displayIcon} alt={weapon.displayName} style={styles.weaponIcon} />
            <h3>{weapon.displayName}</h3>
            <p>Cost: {weapon.shopData?.cost || "Free"}</p>
            <p>Category: {weapon.category.split("::")[1]}</p>
          </div>
        ))}
      </div>

      {selectedWeapon && (
        <div style={styles.weaponDetails}>
          <h2>{selectedWeapon.displayName}</h2>
          <img src={selectedWeapon.displayIcon} alt={selectedWeapon.displayName} style={styles.detailIcon} />
          <p>
            <strong>Cost:</strong> {selectedWeapon.shopData?.cost || "Free"}
          </p>
          <p>
            <strong>Category:</strong> {selectedWeapon.category.split("::")[1]}
          </p>
          <p>
            <strong>Fire Rate:</strong> {selectedWeapon.weaponStats?.fireRate || "N/A"} rounds/sec
          </p>
          <p>
            <strong>Magazine Size:</strong> {selectedWeapon.weaponStats?.magazineSize || "N/A"} bullets
          </p>
          <p>
            <strong>Reload Time:</strong> {selectedWeapon.weaponStats?.reloadTimeSeconds || "N/A"} seconds
          </p>
        </div>
      )}
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#0f1923",
    color: "#fff",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  weaponGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  weaponCard: {
    backgroundColor: "#1c2533",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  weaponCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 4px 15px rgba(255, 70, 85, 0.5)",
  },
  weaponIcon: {
    maxWidth: "100%",
    height: "100px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  weaponDetails: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "#1c2533",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(255, 70, 85, 0.5)",
  },
  detailIcon: {
    maxWidth: "100%",
    height: "150px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto 20px",
  },
};

export default GunPage;
