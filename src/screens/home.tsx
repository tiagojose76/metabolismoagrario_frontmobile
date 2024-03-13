import { ConstantsModal } from "@/components/ConstantsModal/index";
import { DimissableKeyboardView } from "@/components/DimissableKeyboardView";
import { DropdownSelect } from "@/components/DropdownSelect";
import { Button, Input, Text, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";

interface FormData {
  harvestedProduction: string;
  area: string;
}

export function Home() {
  const { theme } = useTheme();
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      harvestedProduction: "0",
      area: "0",
    },
  });

  function onSubmit(data: FormData) {
    if (!selectedCrop) {
      Alert.alert("Selecione uma cultura!");
      return;
    }
    Alert.alert(JSON.stringify({ ...data, selectedCrop }));
  }

  return (
    <DimissableKeyboardView>
      <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: "space-between" }}>
        <View style={{ gap: theme.spacing.lg }}>
          <Text h1 style={{ textAlign: "center" }}>
            PPL - Calculadora
          </Text>

          <View style={{ marginHorizontal: 10, gap: 4, paddingBottom: 24 }}>
            <Text style={{ fontSize: 16, color: theme?.colors?.grey3, fontWeight: "bold" }}>Cultura</Text>
            <DropdownSelect
              items={[
                { id: "2", label: "Arroz" },
                { id: "1", label: "Tomate" },
                { id: "3", label: "Cana de Açucar" },
              ]}
              onSelect={(c) => setSelectedCrop(c)}
            />
          </View>

          <Controller
            control={control}
            rules={{
              required: true,
              // validate: (value) => Number(value) > 0,
            }}
            name="harvestedProduction"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Produção colhida (t de massa fresca)"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="area"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Área plantada (ha)"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View style={{ gap: theme.spacing.lg }}>
          <ConstantsModal />
          <Button size="lg" onPress={handleSubmit(onSubmit)}>
            Calcular
          </Button>
        </View>
      </View>
    </DimissableKeyboardView>
  );
}
