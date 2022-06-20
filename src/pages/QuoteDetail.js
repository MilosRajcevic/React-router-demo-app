import { useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function QuoteDetail() {
  const params = useParams();

  // Radimo destructuring, jer kada stavljamo u useEefect dependecies paramas.quoteId,
  // nece se samo u zavistnosti od quoteID menjati stanje vec naspram celog params objekta.
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <section>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <div className="centered">
        <Link className="btn--flat" to="comments">
          Load Commnets
        </Link>
      </div>
      <Outlet />
    </section>
  );
}

export default QuoteDetail;
