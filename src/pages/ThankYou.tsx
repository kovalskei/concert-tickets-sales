import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#3CB8E0]/20 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={48} className="text-[#3CB8E0]" />
            </div>
            <h1 className="text-5xl font-heading font-bold text-foreground mb-4">
              Спасибо за покупку! 🎉
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Билеты отправлены на вашу почту. До встречи на концерте!
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-heading font-bold text-foreground mb-2">
              <span className="text-[#3CB8E0]">🔵</span> Сделать вечер ещё лучше
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-card border-border hover:card-glow transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#3CB8E0]/20 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={32} className="text-[#3CB8E0]" />
                </div>
                <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                  Парный билет
                </h4>
                <p className="text-muted-foreground mb-6">
                  -10% при покупке двух мест в одном заказе
                </p>
                <Button variant="outline" className="w-full border-[#3CB8E0] hover:bg-[#3CB8E0]/10">
                  Добавить
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:card-glow transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#FF8C42]/20 rounded-full flex items-center justify-center">
                  <Icon name="Flower" size={32} className="text-[#FF8C42]" />
                </div>
                <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                  Букет у входа
                </h4>
                <p className="text-muted-foreground mb-6">
                  Готов к выдаче перед концертом — 999 ₽
                </p>
                <Button variant="outline" className="w-full border-[#FF8C42] hover:bg-[#FF8C42]/10">
                  Добавить
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:card-glow transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#8B7AB8]/20 rounded-full flex items-center justify-center">
                  <Icon name="Camera" size={32} className="text-[#8B7AB8]" />
                </div>
                <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                  Фото-съёмка
                </h4>
                <p className="text-muted-foreground mb-6">
                  5 обработанных фото — 1 499 ₽
                </p>
                <Button variant="outline" className="w-full border-[#8B7AB8] hover:bg-[#8B7AB8]/10">
                  Добавить
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button size="lg" variant="outline">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ThankYou;
