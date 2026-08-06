import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(userId: number) {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
    }

    create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDto
        });
    }

    async update(userId: number, updateUserDto: UpdateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.prisma.user.update({
            data: updateUserDto,
            where: {
                id: userId
            }
        });
    }

    async delete(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return this.prisma.user.delete({
            where: {
                id: userId
            }
        })
    }
}
