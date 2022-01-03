import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  ITransaction,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserInfo,
  UserWrapper,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from "./styles";

export interface IDataListProps extends ITransaction {
  id: string;
}

interface IHighlighData {
  income: {
    amount: string;
  };
  outcome: {
    amount: string;
  };
  total: {
    amount: string;
  };
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<IDataListProps[]>();
  const [highlightData, setHighLightData] = useState<IHighlighData>(
    {} as IHighlighData
  );

  async function loadTransaction() {
    const dataKey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let incomeTotal = 0;
    let outcomeTotal = 0;

    const transactionsFormatted: IDataListProps[] = transactions.map(
      (transaction: IDataListProps) => {
        if (transaction.type === "up") {
          incomeTotal += Number(transaction.amount);
        }

        if (transaction.type === "down") {
          outcomeTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount)
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", "R$ ");

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          type: transaction.type,
          category: transaction.category,
          amount,
          date,
        };
      }
    );

    const total = incomeTotal - outcomeTotal;

    setHighLightData({
      income: {
        amount: incomeTotal
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", "R$ "),
      },
      outcome: {
        amount: outcomeTotal
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", "R$ "),
      },
      total: {
        amount: total
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", "R$ "),
      },
    });

    setTransactions(transactionsFormatted);
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [])
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "http://github.com/rsjayme.png" }} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Raphael</UserName>
            </User>
          </UserInfo>

          <LogoutButton
            onPress={() => {
              console.log("touch");
            }}
          >
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData?.income?.amount}
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData?.outcome?.amount}
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData?.total?.amount}
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
