import React from 'react';
import { ListThoughts } from 'components/ListThoughts';
import { SubmitThoughts } from 'components/SubmitThoughts';

export const App = () => {
  return (
    <section className="mainBody">
      <SubmitThoughts />
      <ListThoughts />
    </section>
  )
}
