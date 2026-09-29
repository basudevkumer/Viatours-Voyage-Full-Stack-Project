import { FiArrowRight } from "react-icons/fi";
import Container from "@/components/shared/Container";

const Newsletter = () => (
  <section className="bg-bg-grey py-14 sm:py-16 lg:py-20">
    <Container>
      <div className="flex flex-col gap-6 rounded-[24px] bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div>
          <p className="caption text-accent">TRAVEL INSPIRATION</p>
          <h2 className="title1 mt-3 text-dark sm:text-2xl">
            Get ideas for your next adventure.
          </h2>
          <p className="body4 mt-2 max-w-[500px] text-text-secondary">
            A little inspiration, useful guides and new ways to see the world —
            sent occasionally.
          </p>
        </div>
        <form action="/contact" method="get" className="flex w-full max-w-[470px] gap-2">
          <label htmlFor="travel-email" className="sr-only">
            Email address
          </label>
          <input
            id="travel-email"
            name="email"
            type="email"
            required
            placeholder="Your email address"
            className="body4 min-w-0 flex-1 rounded-[12px] border border-gray5 bg-bg-field px-4 py-3 text-dark placeholder:text-text-secondary focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Get travel ideas"
            className="flex shrink-0 items-center gap-2 rounded-[12px] bg-accent px-4 py-3 title4 text-white transition-colors hover:bg-dark sm:px-5"
          >
            Get travel ideas <FiArrowRight aria-hidden="true" />
          </button>
        </form>
      </div>
    </Container>
  </section>
);

export default Newsletter;
