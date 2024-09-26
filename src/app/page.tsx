import "bootstrap/dist/css/bootstrap.min.css";
import Hero from "./components/hero";
import Search from "./components/search";
import CarListing from "./components/carlisting";
export default function Page() {
  return (
    <main>
      <Hero />
      <Search />
      <CarListing />
    </main>
  );
}
