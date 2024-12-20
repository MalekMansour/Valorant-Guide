import React, { useState } from "react";
import "./gun.css"; // Make sure to create a matching CSS file for styling

type Weapon = {
  name: string;
  cost: number | string;
  type: string;
  description: string;
  image: string; // Add image paths for each gun
};

const weapons: Weapon[] = [
  // Sidearms
  { name: "Classic", cost: "Free", type: "Sidearm", description: "Burst fire sidearm.", image: "path_to_image" },
  { name: "Shorty", cost: 200, type: "Sidearm", description: "Close-range sidearm.", image: "path_to_image" },
  { name: "Frenzy", cost: 500, type: "Sidearm", description: "Rapid-fire sidearm.", image: "path_to_image" },
  { name: "Ghost", cost: 500, type: "Sidearm", description: "Silenced sidearm.", image: "path_to_image" },
  { name: "Sheriff", cost: 800, type: "Sidearm", description: "High-damage revolver.", image: "path_to_image" },

  // SMGs
  { name: "Stinger", cost: 1000, type: "SMG", description: "Fast fire SMG.", image: "path_to_image" },
  { name: "Spectre", cost: 1600, type: "SMG", description: "Silenced SMG.", image: "path_to_image" },

  // Rifles
  { name: "Bulldog", cost: 2100, type: "Rifle", description: "Burst-fire rifle.", image: "path_to_image" },
  { name: "Guardian", cost: 2700, type: "Rifle", description: "Semi-auto rifle.", image: "path_to_image" },
  { name: "Phantom", cost: 2900, type: "Rifle", description: "Silenced auto rifle.", image: "path_to_image" },
  { name: "Vandal", cost: 2900, type: "Rifle", description: "High-damage auto rifle.", image: "path_to_image" },

  // Snipers
  { name: "Marshal", cost: 1100, type: "Sniper", description: "Light sniper rifle.", image: "path_to_image" },
  { name: "Operator", cost: 4500, type: "Sniper", description: "High-damage sniper.", image: "path_to_image" },

  // Shotguns
  { name: "Bucky", cost: 900, type: "Shotgun", description: "Pump-action shotgun.", image: "path_to_image" },
  { name: "Judge", cost: 1850, type: "Shotgun", description: "Automatic shotgun.", image: "path_to_image" },

  // Heavy
  { name: "Ares", cost: 1700, type: "Heavy", description: "Light machine gun.", image: "path_to_image" },
  { name: "Odin", cost: 3200, type: "Heavy", description: "Heavy machine gun.", image: "path_to_image" },
];

const GunMenu: React.FC = () => {
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  const handleWeaponClick = (weapon: Weapon) => {
    setSelectedWeapon(weapon);
  };

  const renderCategory = (type: string) => {
    return (
      <div className="category">
        <h2>{type}</h2>
        <div className="weapon-grid">
          {weapons
            .filter((weapon) => weapon.type === type)
            .map((weapon) => (
              <div
                key={weapon.name}
                className={`weapon ${selectedWeapon?.name === weapon.name ? "selected" : ""}`}
                onClick={() => handleWeaponClick(weapon)}
              >
                <img src={weapon.image} alt={weapon.name} className="weapon-image" />
                <p className="weapon-name">{weapon.name}</p>
                <p className="weapon-cost">{weapon.cost === "Free" ? "Free" : `₭${weapon.cost}`}</p>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="gun-menu">
      <div className="categories">
        {["Sidearm", "SMG", "Rifle", "Sniper", "Shotgun", "Heavy"].map((type) => renderCategory(type))}
      </div>
      {selectedWeapon && (
        <div className="weapon-details">
          <h2>{selectedWeapon.name}</h2>
          <p>{selectedWeapon.description}</p>
          <p>Cost: {selectedWeapon.cost === "Free" ? "Free" : `₭${selectedWeapon.cost}`}</p>
        </div>
      )}
    </div>
  );
};

export default GunMenu;
