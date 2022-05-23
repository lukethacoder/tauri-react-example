import React, { FC, useCallback, useState } from 'react'

import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

const ITEM_TYPE_CARD = 'Card'

const Card = ({ isDragging, text }) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ITEM_TYPE_CARD,
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  )
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  )
}

interface Item {
  id: number
  text: string
}

interface ContainerState {
  cards: Item[]
}

const Container: FC = () => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      },
      {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      },
    ])

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      )
    }, [])

    const renderCard = useCallback(
      (card: { id: number; text: string }, index: number) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
          />
        )
      },
      []
    )

    return (
      <>
        <div className='dnd-container'>
          {cards.map((card, i) => renderCard(card, i))}
        </div>
      </>
    )
  }
}

export function DndExample() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  )
}
