import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { initialQuizData } from '../data/quizData'
import { useNavigate } from 'react-router-dom' // để quay về Home

export default function Quiz() {
  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { id: selected }
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQ = initialQuizData[currentIndex]
  const selected = answers[currentQ?.id]

  // Chọn đáp án
  const selectAnswer = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: option }))
  }

  // Next hoặc Finish
  const handleNext = () => {
    if (currentIndex < initialQuizData.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  // Tính điểm
  const calculateScore = () => {
    return initialQuizData.reduce((score, q) => {
      return score + (answers[q.id] === q.correctAnswer ? 1 : 0)
    }, 0)
  }

  // Quay về Home khi ấn Xác Nhận
  const goHome = () => {
    navigate('/')
  }

  return (
    <Container className='py-5'>
      <Row className='justify-content-center'>
        <Col lg={10}>
          <div className='d-flex flex-wrap gap-5'>
            {/* Bên trái: Câu hỏi hiện tại */}
            {!isCompleted && (
              <div className='flex-grow-1'>
                <h2 className='text-danger fw-bold mb-4'>
                  Question {currentQ.id}
                </h2>

                <Card className='border-0 shadow-sm'>
                  <Card.Body>
                    <Card.Title as='h4' className='mb-4'>
                      {currentQ.question}
                    </Card.Title>

                    <Form>
                      {currentQ.answers.map((opt, idx) => (
                        <Form.Check
                          key={idx}
                          type='radio'
                          id={`opt-${currentQ.id}-${idx}`}
                          name={`q-${currentQ.id}`}
                          label={opt}
                          checked={selected === opt}
                          onChange={() => selectAnswer(opt)}
                          className='mb-3 fs-5 quiz-option'
                        />
                      ))}
                    </Form>
                  </Card.Body>
                </Card>

                <Button
                  variant='danger'
                  size='lg'
                  className='mt-4 px-5'
                  onClick={handleNext}
                  disabled={!selected}
                >
                  {currentIndex === initialQuizData.length - 1
                    ? 'Finish'
                    : 'Next'}
                </Button>
              </div>
            )}

            {/* Bên phải: Kết quả khi hoàn thành */}
            {isCompleted && (
              <div className='flex-grow-1 text-center'>
                <Card className='border-0 shadow-lg p-5'>
                  <Card.Body>
                    <h1 className='text-danger fw-bold mb-4'>
                      Quiz Completed!
                    </h1>
                    <h3 className='fw-bold'>
                      Your score: {calculateScore()} / {initialQuizData.length}
                    </h3>

                    <Button
                      variant='primary'
                      size='lg'
                      className='mt-5 px-5'
                      onClick={goHome}
                    >
                      Xác Nhận
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}
