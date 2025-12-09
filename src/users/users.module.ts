import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OwnerGuard } from 'src/auth/guards/owner.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide: OwnerGuard,
      useFactory: (usersService: UsersService) => {
        return new OwnerGuard(usersService);
      },
      inject: [UsersService],
    },
  ],
})
export class UsersModule {}
