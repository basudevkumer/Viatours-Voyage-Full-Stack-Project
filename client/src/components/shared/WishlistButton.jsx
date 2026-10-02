"use client";

import { useContext, useState } from "react";
import { FiHeart } from "react-icons/fi";
import IconButton from "@/components/ui/IconButton";
import { WishlistContext } from "@/context/WishlistContext";

export default function WishlistButton({ itemId, itemType, label, initialSaved = false, className }) {
  const wishlist = useContext(WishlistContext);
  const [localSaved, setLocalSaved] = useState(initialSaved);
  const contextSaved = wishlist?.isSaved?.(itemId, itemType) ?? wishlist?.items?.some((item) => item.id === itemId && item.type === itemType) ?? null;
  const saved = contextSaved == null ? localSaved : contextSaved;
  const toggle = () => {
    if (wishlist?.toggleItem) wishlist.toggleItem(itemId, itemType, label);
    else setLocalSaved((current) => !current);
  };
  return <IconButton icon={<FiHeart className={saved ? "fill-current" : ""} />} label={`${saved ? "Remove from" : "Add to"} wishlist: ${label}`} aria-pressed={saved} onClick={toggle} className={className} />;
}
