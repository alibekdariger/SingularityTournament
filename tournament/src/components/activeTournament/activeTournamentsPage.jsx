import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import isEmpty from '../functions/checkEmpty';
import doWeHaveToken from '../functions/checkIfAutorized';
import Header from '../pageElements/header';
import ReactLoading from 'react-loading';
import WinLose from '../buttons/winLose';
import LeaderBoard from '../activeTournament/LeaderBoard';
import Footer from '../pageElements/footer';

import ShowFacts from '../buttons/ShowFacts';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

async function tournamentDetails(id) {
  const token = sessionStorage.getItem('token');
  try {
    const req = await fetch(
      `http://localhost:8189/api/v1/app/tournament/tourney/bracket/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    const res = await req.json();

    return res;
  } catch {
    console.log('error');
  }
}

export default function ActiveTournamentPage() {
  const { id } = useParams();
  const [tournamentTable, setTable] = useState([]);
  const getTournament = useCallback(async () => {
    try {
      const data = await tournamentDetails(id);
      setTable(data);
    } catch {
      console.log('error');
    }
  });

  useEffect(() => {
    try {
      getTournament();
    } catch {
      console.log('error');
    }
  }, []);

  if (doWeHaveToken() && !isEmpty(tournamentTable)) {
    const startedDate = new Date(tournamentTable.startedDate);
    let test = new Date(startedDate.setDate(startedDate.getDate() - 1));
    const user = sessionStorage.getItem('user');
    const login = sessionStorage.getItem('login');
    return (
      <div className="activeTournamentPage">
        <Header />
        <div className="participantsInfo">
          <div className="mainPageTitle">
            <h2>Active Tournament</h2>
          </div>

          <div className="participantsElemets">
            <div className="tournayName">
              {tournamentTable.name} ({tournamentTable.type})
            </div>
            <div className="tournamentDate">
              {tournamentTable.startedDate}/{tournamentTable.finishedDate}
            </div>
            <div className="participantsInfoDescr">
              <div className="participantsListTtile">
                Tournament Desctiption
              </div>
              {tournamentTable.description}
            </div>
            <LeaderBoard id={id} />

            <div className="participantsList">
              <Accordion>
                {tournamentTable.roundList.map((elem, index) => {
                  let day = test.getDay();
                  if (day === 5) {
                    test = new Date(test.setDate(test.getDate() + 3));
                  } else {
                    test = new Date(test.setDate(test.getDate() + 1));
                  }
                  const dateResult = test.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                  return (
                    <AccordionItem className="accordionItem">
                      <div className="item">
                        <div className="dateTitle">
                          <div className="participantsListTtile">
                            <AccordionButton className="accordion">
                              {/* <Box flex="1" textAlign="left"> */}
                              Tournament Round {elem.stage}
                              {/* </Box> */}
                            </AccordionButton>
                          </div>
                          <div key={index} className="roundDate">
                            {dateResult}
                          </div>
                        </div>

                        <div className="playsBox">
                          <AccordionPanel className="accordionPanel" pb={4}>
                            {elem.matches.map((element) => {
                              if (element.winner) {
                                if (user === element.winner) {
                                  if (element.winner === element.username1) {
                                    return (
                                      <div className="playsWithBtn">
                                        <div
                                          key={element.login}
                                          className="plays"
                                        >
                                          <div className="firstPlayer winner">
                                            <ShowFacts
                                              user={element.username1}
                                            />
                                            <WinLose
                                              user={element.username1}
                                              userOpponent={element.username2}
                                              login={login}
                                              stage={elem.stage}
                                              tournamentId={id}
                                              winner={element.username1}
                                              haveWinner={true}
                                            />
                                          </div>
                                          <div className="secondPlayer">
                                            <ShowFacts
                                              user={element.username2}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                  if (element.winner === element.username2) {
                                    return (
                                      <div className="playsWithBtn">
                                        <div
                                          key={element.login}
                                          className="plays"
                                        >
                                          <div className="firstPlayer ">
                                            <ShowFacts
                                              user={element.username1}
                                            />
                                          </div>
                                          <div className="secondPlayer winner">
                                            <ShowFacts
                                              user={element.username2}
                                            />
                                            <WinLose
                                              user={element.username2}
                                              userOpponent={element.username1}
                                              login={login}
                                              stage={elem.stage}
                                              tournamentId={id}
                                              winner={element.username2}
                                              haveWinner={true}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                }
                              }
                              if (user === element.username1) {
                                if (element.winner === element.username2) {
                                  return (
                                    <div className="playsWithBtn">
                                      <div
                                        key={element.login}
                                        className="plays"
                                      >
                                        <div className="firstPlayer ">
                                          <ShowFacts user={element.username1} />
                                          <WinLose
                                            user={element.username1}
                                            userOpponent={element.username2}
                                            login={login}
                                            stage={elem.stage}
                                            tournamentId={id}
                                            winner={element.username2}
                                            haveWinner={true}
                                          />
                                        </div>
                                        <div className="secondPlayer winner">
                                          <ShowFacts user={element.username2} />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div className="playsWithBtn">
                                    <div key={element.login} className="plays">
                                      <div className="firstPlayer ">
                                        <ShowFacts user={element.username1} />
                                        <WinLose
                                          user={element.username1}
                                          userOpponent={element.username2}
                                          login={login}
                                          stage={elem.stage}
                                          tournamentId={id}
                                          haveWinner={false}
                                        />
                                      </div>
                                      <div className="secondPlayer">
                                        <ShowFacts user={element.username2} />
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              if (user === element.username2) {
                                if (element.winner === element.username1) {
                                  return (
                                    <div className="playsWithBtn">
                                      <div
                                        key={element.login}
                                        className="plays"
                                      >
                                        <div className="firstPlayer winner">
                                          <ShowFacts user={element.username1} />
                                        </div>
                                        <div className="secondPlayer ">
                                          <ShowFacts user={element.username2} />
                                          <WinLose
                                            user={element.username1}
                                            userOpponent={element.username2}
                                            login={login}
                                            stage={elem.stage}
                                            tournamentId={id}
                                            winner={element.username1}
                                            haveWinner={true}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div className="playsWithBtn">
                                    <div key={element.login} className="plays">
                                      <div className="firstPlayer ">
                                        <ShowFacts user={element.username1} />
                                      </div>
                                      <div className="secondPlayer">
                                        <ShowFacts user={element.username2} />
                                        <WinLose
                                          user={element.username2}
                                          userOpponent={element.username1}
                                          login={login}
                                          stage={elem.stage}
                                          tournamentId={id}
                                          haveWinner={false}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              if (element.winner === element.username1) {
                                return (
                                  <div key={element.login} className="plays">
                                    <div className="firstPlayer winner">
                                      <ShowFacts user={element.username1} />
                                    </div>
                                    <div className="secondPlayer">
                                      <ShowFacts user={element.username2} />
                                    </div>
                                  </div>
                                );
                              }
                              if (element.winner === element.username2) {
                                return (
                                  <div key={element.login} className="plays">
                                    <div className="firstPlayer ">
                                      <ShowFacts user={element.username1} />
                                    </div>
                                    <div className="secondPlayer winner">
                                      <ShowFacts user={element.username2} />
                                      {/* <button
                                        className="playersBtn"
                                        onClick={() => {
                                          showFacts(element.username2);
                                        }}
                                      >
                                        {element.username2}
                                      </button> */}
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <div key={element.login} className="plays">
                                  <div className="firstPlayer ">
                                    <ShowFacts user={element.username1} />
                                  </div>
                                  <div className="secondPlayer">
                                    <ShowFacts user={element.username2} />
                                  </div>
                                </div>
                              );
                            })}
                          </AccordionPanel>
                        </div>
                      </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="activeTournamentPage">
      <Header />
      <ReactLoading color={'orange'} className="center" />
      <Footer />
    </div>
  );
}
