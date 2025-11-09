import { useState } from "react";
import { Header } from "./components/Header";
import { MapView } from "./components/MapView";
import { PopupList } from "./components/PopupList";
import { PopupDetail } from "./components/PopupDetail";
import { Footer } from "./components/Footer";
import { CreatePopupForm } from "./components/CreatePopupForm";
import { SearchDialog } from "./components/SearchDialog";
import { SavedPopups } from "./components/SavedPopups";
import { UserProfile } from "./components/UserProfile";
import { PopupBusinessPage } from "./components/PopupBusinessPage";
import { mockPopups } from "./data/mockPopups";
import { savedPopups } from "./data/savedPopups";
import { Popup } from "./types/popup";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

const POPUPS_PER_PAGE = 5;
// Default center (San Francisco area)
const DEFAULT_CENTER: [number, number] = [37.7749, -122.4194];

type ViewType =
  | "home"
  | "map"
  | "post"
  | "search"
  | "saved"
  | "profile"
  | "business";

export default function App() {
  const [selectedPopup, setSelectedPopup] =
    useState<Popup | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentView, setCurrentView] =
    useState<ViewType>("home");
  const [isCreateFormOpen, setIsCreateFormOpen] =
    useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] =
    useState(false);

  const totalPages = Math.ceil(
    mockPopups.length / POPUPS_PER_PAGE,
  );
  const startIndex = currentPage * POPUPS_PER_PAGE;
  const endIndex = startIndex + POPUPS_PER_PAGE;
  const currentPopups = mockPopups.slice(startIndex, endIndex);
  const handleMarkerClick = (popup: Popup) => {
    setSelectedPopup(popup);
  };

  const handlePopupClick = (popup: Popup) => {
    setSelectedPopup(popup);
  };

  const handleCloseDetail = () => {
    setSelectedPopup(null);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchClick = () => {
    setIsSearchDialogOpen(true);
  };

  const handleSettingsClick = () => {
    toast.info("Settings feature coming soon!");
  };

  const handleProfileClick = () => {
    setCurrentView("profile");
    setSelectedPopup(null);
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setSelectedPopup(null);

    if (view === "home") {
      setCurrentPage(0);
    } else if (view === "post") {
      setIsCreateFormOpen(true);
    } else if (view === "search") {
      setIsSearchDialogOpen(true);
    } else if (view === "saved") {
      // Saved view handled in the main render
    }
  };

  const handleStartPopping = () => {
    setCurrentView("business");
    setSelectedPopup(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header
        onSearchClick={handleSearchClick}
        onSettingsClick={handleSettingsClick}
        onProfileClick={handleProfileClick}
      />

      <main
        className={
          currentView === "saved" ||
          currentView === "profile" ||
          currentView === "business"
            ? ""
            : "max-w-7xl mx-auto p-6 space-y-6"
        }
      >
        {currentView === "business" ? (
          /* Business Dashboard View */
          <PopupBusinessPage />
        ) : currentView === "profile" ? (
          /* Profile View */
          <UserProfile onStartPopping={handleStartPopping} />
        ) : currentView === "saved" ? (
          /* Saved Popups View */
          <SavedPopups savedPopups={savedPopups} />
        ) : currentView === "map" ? (
          /* Full Screen Map View */
          <div className="fixed inset-0 top-[72px] z-40">
            <MapView
              popups={mockPopups}
              onMarkerClick={handleMarkerClick}
              center={DEFAULT_CENTER}
              fullScreen={true}
            />
            {selectedPopup && (
              <div className="absolute bottom-4 left-4 right-4 max-w-md mx-auto">
                <PopupDetail
                  popup={selectedPopup}
                  onClose={handleCloseDetail}
                />
              </div>
            )}
          </div>
        ) : (
          /* Home View */
          <>
            {/* Map Section */}
            <MapView
              popups={mockPopups}
              onMarkerClick={handleMarkerClick}
              center={DEFAULT_CENTER}
            />

            {/* Content Section - Either list or detail view */}
            <div className="pb-8">
              {selectedPopup ? (
                <PopupDetail
                  popup={selectedPopup}
                  onClose={handleCloseDetail}
                />
              ) : (
                <PopupList
                  popups={currentPopups}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onNextPage={handleNextPage}
                  onPrevPage={handlePrevPage}
                  onPopupClick={handlePopupClick}
                />
              )}
            </div>
          </>
        )}
      </main>

      <Footer
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <CreatePopupForm
        isOpen={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
      />

      <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)}
      />

      <Toaster />
    </div>
  );
}