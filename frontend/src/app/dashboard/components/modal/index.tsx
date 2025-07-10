"use client"
import styles from './styles.module.scss'
import { X } from 'lucide-react'
import { use } from 'react'
import { OrderContext } from '@/providers/order'
import { calculateTotalOrder } from '@/lib/helper'
import Image from 'next/image'

export function Modalorder() {

    const { onRequestClose, order, finishOrder } = use(OrderContext)

    async function handleFinishOrder() {
        await finishOrder(order[0].order.id)
    }

    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color='#FF3f4b' />
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do pedido</h2>

                    <span className={styles.table}>
                        Mesa <b>{order[0].order.table}</b>
                    </span>

                    {order[0].order.name && (
                        <span className={styles.name}>
                            <b>{order[0].order.name}</b>
                        </span>
                    )}

                    {order.map(item => (
                        <section className={styles.item} key={item.id}>
                            <Image
                                src={item.product.banner}
                                alt={`Foto do produto: ${item.product.name}`}
                                width={120}
                                height={120}
                            />

                            <span>
                                Qtd: {item.amount} - <b>{item.product.name}</b> - R$ {(
                                    (Number(item.product.price) || 0) * (Number(item.amount) || 0)
                                ).toFixed(2)}
                            </span>
                            <span className={styles.description}>{item.product.description}</span>
                        </section>
                    ))}

                    <h3 className={styles.total}>Valor total do pedido: R$ {calculateTotalOrder(order)}</h3>

                    <button className={styles.buttonOrder} onClick={handleFinishOrder}>
                        Concluir pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}